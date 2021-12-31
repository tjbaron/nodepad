import {
    Colors, Controls
} from "@tjbaron/flume";

export const portTypes = [
    {
        type: "string",
        name: "string",
        label: "string",
        color: Colors.red,
        controls: [
            Controls.text({
                name: "string",
                label: "string"
            })
        ]
    },
    {
        type: "number",
        name: "number",
        label: "number",
        color: Colors.blue,
        controls: [
            Controls.number({
                name: "number",
                label: "number"
            })
        ]
    },
    {
        type: "date",
        name: "date",
        label: "date",
        color: Colors.purple,
        controls: []
    },
    {
        type: "any",
        acceptTypes: ["any", "string", "number"] as string[],
        name: "any",
        label: "any",
        color: Colors.gray,
        controls: [] as any,
    }
];
