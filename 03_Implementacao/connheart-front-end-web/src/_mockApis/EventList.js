import defaultUserAvatarRound from 'assets/images/users/user-round.svg';

const eventList = [
    {
        id: 1,
        img: defaultUserAvatarRound,
        patient: 'Ricardo Dias',
        eventName: 'Queda',
        date: new Date(),
        lastTrans: new Date(),
        progress: '100%',
        day: new Date().getDate(),
        hour: new Date().getHours(),
        medic: 'Dr. Paulo Neves',
        nurse: 'Enf. Joana Santos'
    },
    {
        id: 2,
        img: defaultUserAvatarRound,
        patient: 'Ricardo Dias',
        eventName: 'Consulta',
        day: '07/07/2024',
        hour: '14:30',
        medic: 'Dr. Paulo Neves',
        nurse: 'Enf. Joana Santos'
    }
];

export default eventList;
