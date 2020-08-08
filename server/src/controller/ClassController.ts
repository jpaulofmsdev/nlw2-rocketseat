import { Request, Response } from "express";
import db from "../database/connection";
import convertHoursToMinutes from "../util/convertHoursToMinutes";

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassController {

    async index(request: Request, response: Response) {

        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHoursToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('classes_schedules.*')
                .from('classes_schedules')
                .whereRaw('`classes_schedules`.`class_id` = `classes`.`id`')
                .whereRaw('`classes_schedules`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`classes_schedules`.`from` <= ??', [timeInMinutes])
                .whereRaw('`classes_schedules`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
    
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
    
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedules = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to)
                }
            });
        
            await trx('classes_schedules').insert(classSchedules);
        
            await trx.commit();
        
            return response.status(201).send();
    
        } catch (err) {

            console.log(err);
            
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    
    }
    
}