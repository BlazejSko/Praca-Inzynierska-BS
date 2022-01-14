export interface User {
        id: number;
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        last_login: string,
        is_superuser: boolean,
        is_staff: boolean,
        is_active: boolean,
        date_joined: string
}