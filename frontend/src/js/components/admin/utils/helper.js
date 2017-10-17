
export function fixControlledValue(value){
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
