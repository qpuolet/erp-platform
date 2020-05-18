export const mapFormValues = ({ title, packing = '' }) => {
    return {
        title,
        packing: packing.split(','),
    }
};
