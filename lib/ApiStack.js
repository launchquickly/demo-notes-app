import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {

    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { table } = props;

        this.api = new sst.Api(this, "Api", {
            defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                environment: {
                    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
                    TABLE_NAME: table.tableName,
                },
            },
            routes: {
                "DELETE /notes/{id}":   "src/delete.main",
                "GET    /notes/{id}":   "src/get.main",
                "GET    /notes":        "src/list.main",
                "POST   /billing":      "src/billing.main",
                "POST   /notes":        "src/create.main",
                "PUT    /notes/{id}":   "src/update.main",
            },
        });

        this.api.attachPermissions([table]);

        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}