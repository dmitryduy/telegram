export type nicknameStatuses =
    'This username is available.'
    | 'Choose your username.'
    | 'This username is too short.'
    | 'This username is already occupied'
    | 'Only a-z, 0-9, and underscores allowed.'
    | 'Cannot connect to server.';

export type nicknameClasses = 'error' | 'neutral' | 'success';

const checkNickname = async (value: string): Promise<[nicknameStatuses, nicknameClasses]> => {
    if (!value.length) {
        return ['Choose your username.', 'neutral'];
    }

    if (value.length < 5) {
        return ['This username is too short.', 'error'];
    }

    if (!/^[a-z_0-9]*$/.test(value)) {
        return ['Only a-z, 0-9, and underscores allowed.', 'error']
    }

    try {
       const res = await fetch(`${process.env.REACT_APP_URL}/is-available-nickname`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nickname: value})
        });
        const isAvailable = await res.json();
        console.log(isAvailable)
        return isAvailable ? ['This username is available.', 'success']: ['This username is already occupied', "error"];

    }
    catch (e) {
        return ['Cannot connect to server.', 'error'];
    }

}

export default checkNickname;