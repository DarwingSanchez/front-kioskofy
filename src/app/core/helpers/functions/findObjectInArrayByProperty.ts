/**
 * Finds an object in an array of objects based on one of its property values
 * @param arr Array of objects where the object to be found is placed
 * @param key property to be used to find the object
 * @param key_value_target property value to be used to find the object
 * @param return_property null if want to return the whole object of pass the porperty key to return just that value of the object
 * @returns the object whose property value is equal to the property value target
 */
export const findObjectInArrayByProperty = (arr: object[], key: string, key_value_target: string | number, return_property: string | null = null): any => {
    if (typeof arr !== 'object' || arr === null || !arr)
        throw new Error('Input is not an object.');

    let res: any = arr.find((item: any) => {        
      return item[key] === key_value_target;
    })

    if (return_property === null || !res)
        return res;
    else 
        return res[return_property];
};
