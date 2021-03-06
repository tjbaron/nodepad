import {
    Colors, Controls
} from "@tjbaron/flume";

export const portTypes = [
    {
        type: "string",
        acceptTypes: ["any", "string"] as string[],
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
        type: "stringarray",
        acceptTypes: ["any", "stringarray"] as string[],
        name: "stringarray",
        label: "stringarray",
        color: Colors.green,
        controls: []
    },
    {
        type: "number",
        acceptTypes: ["any", "number"] as string[],
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
        type: "numberarray",
        acceptTypes: ["any", "numberarray"] as string[],
        name: "numberarray",
        label: "numberarray",
        color: Colors.yellow,
        controls: []
    },
    {
        type: "filearray",
        acceptTypes: ["filearray", "any"] as string[],
        name: "filearray",
        label: "filearray",
        color: Colors.magenta,
        controls: []
    },
    {
        type: "date",
        acceptTypes: ["any", "date"] as string[],
        name: "date",
        label: "date",
        color: Colors.purple,
        controls: []
    },
    {
        type: "boolean",
        acceptTypes: ["any", "boolean"] as string[],
        name: "boolean",
        label: "boolean",
        color: Colors.orange,
        controls: [
            Controls.checkbox({
                name: "boolean",
                label: "boolean"
            })
        ]
    },
    {
        type: "brain",
        acceptTypes: ["brain"] as string[],
        name: "brain",
        label: "brain",
        color: Colors.pink,
        controls: []
    },
    {
        type: "any",
        acceptTypes: ["any", "string", "number", "date", "boolean", "stringarray", "numberarray", "filearray"] as string[],
        name: "any",
        label: "any",
        color: Colors.gray,
        controls: [] as any,
    }
];
