// Used by VSCode GraphQL Plugin to improve dev experience
// const { API_TOKEN } = process.env
module.exports = {
    schema: "./schema.graphql",
    extensions: {
        endpoints: {
              default: {
                url: "http://localhost:3000/graphql/",
                headers: {
                    Authorization: "Basic YWRtaW46YWRtaW4=", // admin:admin
                    // Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        },
    }
};
