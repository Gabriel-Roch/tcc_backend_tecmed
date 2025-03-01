import { createHash } from 'node:crypto';

export const generateHashMd5 = (passwordString: string): string => {
    try {
        return createHash('md5').update(passwordString).digest('hex');
    } catch (error) {
        console.error(error);
        throw new Error('Error creating hash password');
    }
};

export const comparePassword = (passwordString: string, passwordHash: string): boolean => {
    try {
        const hashedPasswordLogin = generateHashMd5(passwordString);
        return hashedPasswordLogin === passwordHash;
    } catch (error) {
        console.error(error);
        throw new Error('Error comparing password');
    }
};