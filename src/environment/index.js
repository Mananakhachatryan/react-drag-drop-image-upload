import dev from './dev';
import prod from './prod';

const environmentResolver = () => {
    return process.env.NODE_ENV === 'development' ? dev : prod;
};

export const ENV = environmentResolver();
