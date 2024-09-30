const standardGreetings = (user, title = false) => {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = 'Bom dia';
    } else if (hour < 18) {
        greeting = 'Boa tarde';
    } else {
        greeting = 'Boa noite';
    }

    const userName = user.name && user.name.length > 0 ? `, ${title ? user.titleShort : ''} ${user.name}` : '';

    return `${greeting}${userName}`;
};

export default standardGreetings;
