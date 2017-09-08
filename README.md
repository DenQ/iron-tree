# iron-tree
This package builds a tree and gives a lot of useful methods for managing a tree and its nodes

****
# Tree
This is the class of tree management

### Properties
* **rootNode** Root tree node
  * type `Node`

### Methods
* **contstructor(object)**
  * params
    * object - json `object`. Optional
  * return `IronTree`
  * example
  ```
    const object = { id: 1, title: 'Root' };
    const tree = new Tree(object);
  ```
* **.add(criteria, object)** Adds a node to the tree if the criterion is true
  * params
    * criteria(Node) - `function` or `string`. If `string` then criteria is **"root"**
    * object - content for the node
  * return `IronTree`
  * examples
  ```
  const object = { id: 1, title: 'Root' };
  const tree = new Tree();
  const resultTree = tree.add('root', object);
  ```
  ```
  const regularObject = { id:2, title: 'Node 2'}
  const resultTree = tree.add((parentNode) => {
      return parentNode.get('id') === 1;
  }, regularObject);
  ```
* **.remove(criteria)** Removes a node from a tree if the criterion is true
  * params
    * criteria(Node) - return `boolean`
  * return `boolean`
  * examples
  ```
  const result = tree.remove((currentNode) => {
      return currentNode.get('id') === 7;
  });
  ```
* **.contains(criteria)** Searches for a node in a tree according to the criterion
  * params
    * criteria(Node) - return `boolean`
  * return `Node`
  * examples
  ```
  const targetNode = tree.contains((currentNode) => {
      return currentNode.get('id') === 7;
  });
  ```

* **.sort(compare)** Sorts a tree
  * params
    * compare(a:Node, b:Node) - comparison function
  * return `null`
  * examples
  ```
  function compareById(vector) {
      return (a, b) => {
          const aid = Number(a.get('id'));
          const bid = Number(b.get('id'));
          if (aid > bid) {
            return vector ? 1 : -1;
          } else if (aid < bid) {
            return vector ? -1 : 1;
          } else {
            return 0
          }
      };
  }
  tree.sort(compareById(false));  //Desc
  ```
* **.move(criteria, destination)** Moves the desired branch or node to the node or branch of the destination, according to the criteria
  * params
    * criteria(Node) - callback
    * destination(Node) - callback
  * return `boolean`
  * examples
  ```
  const search = (currentNode) => currentNode.get('id') === 7;
  const destination = (currentNode) => currentNode.get('id') === 3;
  const result = tree.move(search, destination);
  ```
* **.traversal(criteria, callback)** Bypasses the tree and, according to the criterion, calls a function for each node
  * params
    * criteria(Node) - return `boolean`
    * callback(Node)
  * return `null`
  * examples
  ```
  const criteria = (currentNode) => currentNode.get('id') === 7;
  tree.traversal(criteria, (currentNode) => {
      currentNode.set('some', true);
  });
  ```
  ```
  tree.traversal(null, (currentNode) => {
      if (currentNode.get('id')%2 === 0) {
        currentNode.set('some', true);
      }
  });
  ```
* **.toJson(options)** Represents a tree in the form of a json format
  * params
    * options - `object`. Optional
      * empty_children - Type `boolean`. Allow empty children. Default `true`
      * key_children - Type `string`. Field name for children. Default `children`
  * return `object`
  * examples
  ```    
  const json = tree.toJson();
  ```
****

# Node
This is the node management class

### Properties
* **content** Content of the node
  * type ```object```
* **children** Children of the node
  * type ```array```
* **length** Number children of the node
  * type ```number```

### Methods
* **.add(child)** Adding a child to the node
* **.remove(criteria)** Removing a child node according to the criterion
* **.get(path)** Access to node content by field name
* **.set(path, value)** Setting a value or creating a new field in the contents of a node
* **.sort(compare)** Sorting child nodes
* **.traversal(criteria, callback)** Bypassing child nodes according to the criterion and applying function to them

****
