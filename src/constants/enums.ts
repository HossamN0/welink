export enum Routes {
    HOME = '',
    AUTH = "auth",
    ADMIN = "admin",
    GATE = "gate",
    CHECKPOINT = 'checkpoint'
}

export enum Pages {
    LOGIN = "login",
    PARKING = "parking",
    CONTROL = "control"
}

export enum Forms {
    LOGIN = "login",
}

export enum InputTypes {
    TEXT = "text",
    PASSWORD = "password",
}

export enum Environment {
    PRODUCTION = "production",
    DEVELOPMENT = "development",
}

export enum Roles {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    VISITOR = "visitor",
    SUBSCRIBER = "subscriber"
}

export enum RateMode {
    NORMAL = "normal",
    SPECIAL = "special"
}

export enum ApiStatus {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

export enum ZoneStatus {
    OPEN = "open",
    CLOSED = "close"
}