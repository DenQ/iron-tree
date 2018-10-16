# iron-tree
This package builds a tree and gives a lot of useful methods for managing a tree and its nodes

# Install
`npm install @denq/iron-tree --save`

# Base usage

```js
// create tree
const object = { id: 1, title: 'Root' };
const tree = new Tree(object);

// add nodes
const regularObject = { id:2, title: 'Node 2'}
tree.add((parentNode) => {
  return parentNode.get('id') === 1;
}, regularObject);

// contains node
const targetNode = tree.contains((currentNode) => {
  return currentNode.get('id') === 2;
});  

// remove node
const result = tree.remove((currentNode) => {
  return currentNode.get('id') === 2;
});

// traversal
const criteria = (currentNode) => currentNode.get('id') === 1;
tree.traversal(criteria, (currentNode) => {
  currentNode.set('some', true);
});

// getPath
const criteria = (currentNode) => currentNode.get('id') === 6;
const targetNode = tree.contains(criteria);
const path = targetNode.getPath();
const pathString = path
  .map((item) => item.get('id'))
  .join(',');
```
```js
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
tree.sort(compareById(false));  // desc
```
The following are the other methods available.
****
# Tree
This is the class of tree management.

### Properties
* **rootNode** Root tree node
  * type `Node`

### Methods
* **contstructor(object)**
  * params
    * object - json `object`. Optional
  * return `IronTree`
  * example
  ```js
    const object = { id: 1, title: 'Root' };
    const tree = new Tree(object);
  ```
* **.add(criteria, object)** Adds a node to the tree if the criterion is true.
  * params
    * criteria(Node) - `function` or `string`. If `string` then criteria is **"root"**
    * object - content for the node
  * return `IronTree`
  * examples
  ```js
  const object = { id: 1, title: 'Root' };
  const tree = new Tree();
  const resultTree = tree.add('root', object);
  ```
  ```js
  const regularObject = { id:2, title: 'Node 2'}
  const resultTree = tree.add((parentNode) => {
      return parentNode.get('id') === 1;
  }, regularObject);
  ```
* **.remove(criteria)** Removes a node from a tree if the criterion is true.
  * params
    * criteria(Node) - return `boolean`
  * return `boolean`
  * examples
  ```js
  const result = tree.remove((currentNode) => {
      return currentNode.get('id') === 7;
  });
  ```
* **.contains(criteria)** Searches for a node in a tree according to the criterion.
  * params
    * criteria(Node) - return `boolean`
  * return `Node`
  * examples
  ```js
  const targetNode = tree.contains((currentNode) => {
      return currentNode.get('id') === 7;
  });
  ```

* **.sort(compare)** Sorts a tree.
  * params
    * compare(a:Node, b:Node) - comparison function
  * return `null`
  * examples
  ```js
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
* **.move(criteria, destination)** Moves the desired branch or node to the node or branch of the destination, according to the criteria.
  * params
    * criteria(Node) - callback
    * destination(Node) - callback
  * return `boolean`
  * examples
  ```js
  const search = (currentNode) => currentNode.get('id') === 7;
  const destination = (currentNode) => currentNode.get('id') === 3;
  const result = tree.move(search, destination);
  ```
* **.traversal(criteria, callback)** Bypasses the tree and, according to the criterion, calls a function for each node.
  * params
    * criteria(Node) - return `boolean`
    * callback(Node)
  * return `null`
  * examples
  ```js
  const criteria = (currentNode) => currentNode.get('id') === 7;
  tree.traversal(criteria, (currentNode) => {
      currentNode.set('some', true);
  });
  ```
  ```js
  tree.traversal(null, (currentNode) => {
      if (currentNode.get('id')%2 === 0) {
        currentNode.set('some', true);
      }
  });
  ```
* **.toJson(options)** Represents a tree in the form of a json format.
  * params
    * options - `object`. Optional
      * empty_children - Type `boolean`. Allow empty children. Default `true`
      * key_children - Type `string`. Field name for children. Default `children`
  * return `object`
  * examples
  ```js
  const json = tree.toJson();
  ```
****

# Node
This is the node management class.

### Properties
* **content** Content of the node
  * type `object`
* **children** Children of the node
  * type `array`
* **length** Number children of the node
  * type `number`

### Methods
* **constructor(json)**
  * params
    * json - simple `json` object
  * examples
  ```js
  const rootContent = {
    id: 1,
    name: 'Root',
  }
  let node = new Node(rootContent);
  ```

* **.add(child)** Adding a child to the node.
  * return `Node` - created node
  * params
    * child - type `object`/json
  * examples
  ```js
  const rootContent = {
    id: 1,
    name: 'Root',
  }
  let node = new Node(rootContent);
  const childNode = node.add({ id: 2, name: 'Two node'});
  ```
* **.remove(criteria)** Removing a child node according to the criterion.
  * return - removed `Node`
  * params
    * criteria - criteria function for removing nodes
  * examples
  ```js
  const removedNodes = node.remove((itemNode) => {
      return itemNode.get('id') === 3;
  })
  ```

* **.get(path)** Access to node content by field name.
  * return `mixed`
  * params
    * path - key name for object in node. For example `id` or `fullname`, etc...
  * examples
  ```js
    node.get('id'); // 1
    node.get('name') // "Some name"
  ```
* **.set(path, value)** Setting a value or creating a new field in the contents of a node.
  * return `boolean`
  * params
    * path - `String` field name
    * value - `mixed`
  * examples
  ```js
  node.set('id', 100)); // returned `true`. Node.content.id = 100
  node.get('id'); // 100
  ```
* **.sort(compare)** Sorting child nodes
  * return `null`
  * params
    * compare - custom function for sorting
  * examples
  ```js
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
  node.sort(compareById(false));
  ```
* **.traversal(criteria, callback)** Bypassing child nodes according to the criterion and applying function to them.
  * return `null`
  * params
    * criteria - `function` criteria each nodes
    * callback - `function` fire when criteria is true for node
  * examples
  ```js
  // for all nodes
  node.traversal(null, (currentNode) => {
    const name = currentNode.get('name');
    currentNode.set('name', `${name}!`);  // Last symbol "!"
  });
  ```
  ```js
  // only for node.id == 3
  node.traversal((currentNode) => currentNode.get('id') === 3, (currentNode) => {
    const name = currentNode.get('name');
    currentNode.set('name', `${name}!`);  // Last symbol "!"
  });
  ```

* **.getPath()** This method return array Nodes from `root node` to `current node`. It maybe helpful for breadcrumbs.
  * return `Array`
  * exampels
  ```js
  const path = targetNode.getPath();
  const pathString = path
    .map((item) => item.get('id'))
    .join(','); // 1,3,4,5,6
  ```

****

## TDD
`npm test`
