import defaultUserAvatarRound from 'assets/images/users/user-round.svg';

const userList = [
    {
        id: 1,
        img_patient: defaultUserAvatarRound,
        patient: 'Ricardo Dias',
        img_medic: defaultUserAvatarRound,
        medic: 'Paulo Dias',
        plan: 'Inactivo',
        date_state: new Date(),
        progress: '0%',
        edit: '/'
    }
];

export default userList;
