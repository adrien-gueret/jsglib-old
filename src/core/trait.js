// TODO: export to Utils?
function Trait(trait) {
    return target_class => {
        Object.getOwnPropertyNames(trait).forEach(property_name => {
            target_class.prototype[property_name] = trait[property_name];
        });
    };
}

export default Trait;