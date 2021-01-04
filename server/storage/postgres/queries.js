module.exports = {
    getAllValues: "SELECT * FROM values;",
    insert: "INSERT INTO values (index, searched_at) VALUES ($1, $2) ON CONFLICT (index) DO UPDATE SET searched_at = $2;"
};