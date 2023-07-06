export enum UserStatusInt {
    "REGISTERED" = 0,
    "ACTIVE" = 1,
    "INACTIVE" = -1,
    "BLOCKED" = -2,
}

export const UserStatusString = {
    REGISTERED: "registered",
    ACTIVE: "active",
    INACTIVE: "inactive",
    BLOCKED: "blocked",
}

export const UserStatusToString = (status: number) => {
    let toString = ""
    switch (status) {
        case UserStatusInt.REGISTERED:
            toString = UserStatusString.REGISTERED
            break;
        case UserStatusInt.ACTIVE:
            toString = UserStatusString.ACTIVE
            break;
        case UserStatusInt.INACTIVE:
            toString = UserStatusString.INACTIVE
            break;
        case UserStatusInt.BLOCKED:
            toString = UserStatusString.BLOCKED
            break;
        default:
            toString = "Not Set"
            break;
    }

    return toString;
}