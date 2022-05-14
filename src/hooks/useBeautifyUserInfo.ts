import { useAppSelector } from "@hooks/useAppSelector";


const useBeautifyUserInfo = (): {fullName: string, nickname: string} => {
    const {name, surname, nickname} = useAppSelector(state => state.user);

    return {fullName: `${name || ''} ${surname || ''}`, nickname: `@${nickname}`};
}

export default useBeautifyUserInfo;