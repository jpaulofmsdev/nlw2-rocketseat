import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

function TeacherItem() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{uri: 'https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-9/87377770_2965699160153718_8116682672618602496_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=wF9Ot0HFpQcAX9PnUPy&_nc_ht=scontent-gig2-1.xx&oh=8ea59a44fe9620347e4005d088e19799&oe=5F4F5670'}}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>João Paulo Ferreira</Text>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;