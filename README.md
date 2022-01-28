# NodePad

Quickly create and test visual node based logic. Generate template code for custom node types.

## Getting started

Below is a list of planned nodes - the hope is once everything below is added NodePad will be
useful as a general tool.

### Types

- boolean
- number
- string
- array(length, item1, item2, ...)
- object(key1, value1, ...)
- any

### Conditionals

if(condition, then, else)
switch(variable, value1, result1, value2, result2, ...)
### Iterators

- map
- reduce

### User Inputs

- user_input(name, description, type, options?)

### Math JS

Some more advanced types are available from using Math JS internally:

- matrix(x, y, fill)
- matrix_identity

And many basic and advanced math operations

- math_add
- math_subtract
- math_multiply
- math_divide
- math_square
- math_eval
- math_sqrt
- math_pow

factorial
det
range


### Network Communication

- fetch(method, path, headers, body?)

### Parsers

- parse_json
- parse_yaml
- parse_xml

### Object Querying

- object_query

### Visualization

- chart_bar
- chart_line
- chart_pie
- chart_scatter
- chart_bubble
- chart_flow

- visual_map
- visual_markdown
