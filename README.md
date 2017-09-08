# iron-tree
This package builds a tree and gives a lot of useful methods for managing a tree and its nodes

****
# Tree
This is the class of tree management

### Properties
* **rootNode** Root tree node

### Methods
* **.add(criteria, object)** Adds a node to the tree if the criterion is true
* **.remove(criteria)** Removes a node from a tree if the criterion is true
* **.contains(criteria)** Searches for a node in a tree according to the criterion
* **.sort(compare)** Sorts a tree
* **.move(criteria, destination)** Moves the desired branch or node to the node or branch of the destination, according to the criteria
* **.traversal(criteria, callback)** Bypasses the tree and, according to the criterion, calls a function for each node
* **.toJson()** Represents a tree in the form of a json format

****

# Node
This is the node management class

### Properties
* **content** Content of the node
* **children** Children of the node
* **length** Number children of the node

### Methods
* **.add(child)** Adding a child to the node
* **.remove(criteria)** Removing a child node according to the criterion
* **.get(path)** Access to node content by field name
* **.set(path, value)** Setting a value or creating a new field in the contents of a node
* **.sort(compare)** Sorting child nodes
* **.traversal(criteria, callback)** Bypassing child nodes according to the criterion and applying function to them

****
