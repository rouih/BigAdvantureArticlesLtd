import { Client } from "@elastic/elasticsearch";
import logger from "../winston-logger";
import dotenv from "dotenv";

dotenv.config();
const elasticClient = new Client({
    node: process.env.ELASTIC_URI || "http://localhost:9200",
    // tls: {
    //     rejectUnauthorized: false,
    // },
    auth: {
        apiKey: process.env.ELASTIC_API_KEY || "elastic"
    }
});

async function createArticleIndex() {
    logger.info(elasticClient);
    const exists = await elasticClient.indices.exists({
        index: "articles",
    });
    if (!exists) {
        await elasticClient.indices.create({
            index: "articles",
            body: {
                mappings: {
                    properties: {
                        title: { type: "text" },
                        body: { type: "text", term_vector: "with_positions_offsets" },
                        author: { type: "text" }
                    },
                },
            },
        });
        logger.info("Article index created");
    }
}

async function updateArticleIndex(savedArticle: any) {
    await elasticClient.index({
        index: 'articles',
        id: savedArticle._id.toString(),
        body: {
            title: savedArticle.title,
            body: savedArticle.body,
            author: savedArticle.author,
        },
    });
}

//TODO: implement a delete index by title

const initElastic = async () => {
    await createArticleIndex();
};



export { elasticClient, initElastic, updateArticleIndex };