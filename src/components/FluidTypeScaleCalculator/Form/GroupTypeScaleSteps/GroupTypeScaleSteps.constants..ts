/** Regex to match a comma-separated of values, with only alphanumeric characters permitted between the commas. */
export const COMMA_SEPARATED_LIST_REGEX = /^[a-zA-Z0-9-](?:(,\s*)?[a-zA-Z0-9-])*$/;
