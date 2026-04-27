import fastify from "fastify";

const app = fastify({
    logger:true
});

app.get ('/', (req, res) => {
    return {
        "name": "user",
    }
});

try {
    app.listen({ port:3000 });
} catch (error) {
    process.exit(1);
}

