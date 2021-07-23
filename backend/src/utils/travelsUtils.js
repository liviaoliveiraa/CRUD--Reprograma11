const findById = (model, id) => {
    const filteredData = model.find(item => item.id == id);

    return filteredData;
}

module.exports = {
    findById
};