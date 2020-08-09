import React, { useState } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { BorderlessButton, RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [ favorites, setFavorites ] = useState<number[]>([]);
    const [ isFilterVisible, setFilterVisible ] = useState(true);

    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToggleFilterVisible() {
        setFilterVisible(!isFilterVisible);
    }
    
    async function handleFiltersSubmit() {
        
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        setFilterVisible(false);
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys Disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}    
            >
                { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia da semana?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                        </View>

                        <RectButton 
                            style={styles.submitButton}
                            onPress={handleFiltersSubmit}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher, index) => {
                    return (
                        <TeacherItem 
                            key={index} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;