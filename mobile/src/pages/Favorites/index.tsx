import React, { useState } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {
    
    const [ favorites, setFavorites ] = useState<Teacher[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys Favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher, index) => {
                    return (
                        <TeacherItem 
                            key={index} 
                            teacher={teacher} 
                            favorited={true}
                        />
                    );
                })}

            </ScrollView>
        </View>
    );
}

export default Favorites;