function transformColumns(columns) {
  // Deep copy to avoid modifying the original object
  const newColumns = JSON.parse(JSON.stringify(columns));

  /**
   * First pass: post-order traversal to calculate height and colSpan for each node.
   * @param {object} node - The node to process.
   * @returns {{height: number, colSpan: number}} - The calculated height and colSpan.
   */
  function calculateSizes(node) {
    if (!node.children || node.children.length === 0) {
      node.height = 1;
      node.colSpan = 1;
      return { height: 1, colSpan: 1 };
    }

    const childrenSizes = node.children.map(child => calculateSizes(child));

    const maxHeight = Math.max(...childrenSizes.map(s => s.height));
    const totalColSpan = childrenSizes.reduce((sum, s) => sum + s.colSpan, 0);

    node.height = maxHeight + 1;
    if (totalColSpan > 1) {
      node.colSpan = totalColSpan;
    }

    return { height: node.height, colSpan: totalColSpan };
  }

  /**
   * Second pass: pre-order traversal to assign rowSpan.
   * This logic is closer to the original request, aligning sibling nodes.
   * @param {object} node - The node to process.
   * @param {number} currentLevelHeight - The remaining height to fill from this node downwards.
   */
  function assignRowSpans(node, currentLevelHeight) {
    // If a node is a leaf in its own branch (no children) and its branch is not the deepest,
    // it needs to span the remaining rows.
    if (!node.children || node.children.length === 0) {
      if (currentLevelHeight > 1) {
        node.rowSpan = currentLevelHeight;
      }
      return;
    }

    // Recurse for children, reducing the available height by 1 for the current level.
    const childrenHeight = currentLevelHeight - 1;
    node.children.forEach(child => assignRowSpans(child, childrenHeight));
  }

  // Run the first pass for all top-level columns
  const topLevelSizes = newColumns.map(col => calculateSizes(col));

  // Find the max height of the entire structure
  const maxTableHeight = Math.max(...topLevelSizes.map(s => s.height));

  // Run the second pass to assign rowSpans
  newColumns.forEach(col => assignRowSpans(col, maxTableHeight));

  // Clean up the temporary height property from the output
  newColumns.forEach(function cleanHeight(node) {
    delete node.height;
    if (node.children) {
      node.children.forEach(cleanHeight);
    }
  });

  return newColumns;
}

const columns = [
  {
    title: "t1",
  },
  {
    title: "t2",
    children: [
      {
        title: "t21",
      },
      {
        title: "t22",
      },
      {
        title: "t23",
      },
    ],
  },
  {
    title: "t3",
    children: [
      {
        title: "t31",
        children: [
          {
            title: "t311",
          },
          {
            title: "t312",
          },
        ],
      },
      {
        title: "t32",
      },
    ],
  },
];

const transformed = transformColumns(columns);
console.log(JSON.stringify(transformed, null, 2));

// --- Additional Test Cases ---

console.log("\\n--- Test Case: Complex 4-Level Structure ---");
const complexData = [
  {
    title: "A",
    children: [
      { title: "A1" },
      {
        title: "A2",
        children: [
          { title: "A21" },
          {
            title: "A22",
            children: [{ title: "A221" }],
          },
        ],
      },
    ],
  },
  { title: "B" },
];
const transformedComplex = transformColumns(complexData);
console.log(JSON.stringify(transformedComplex, null, 2));


console.log("\\n--- Test Case: Flat Structure ---");
const flatData = [
  { title: "Name" },
  { title: "Age" },
  { title: "Location" },
];
const transformedFlat = transformColumns(flatData);
console.log(JSON.stringify(transformedFlat, null, 2));

// 转化为
/*
const columns = [
  {
    title: "t1",
    rowSpan: 3,
  },
  {
    title: "t2",
    colSpan: 3,
    children: [
      {
        title: "t21",
        rowSpan: 2,
      },
      {
        title: "t22",
        rowSpan: 2,
      },
      {
        title: "t23",
        rowSpan: 2,
      },
    ],
  },
  {
    title: "t3",
    colSpan: 3,
    children: [
      {
        title: "t31",
        children: [
          {
            title: "t311",
          },
          {
            title: "t312",
          },
        ],
      },
      {
        title: "t32",
        rowSpan: 2,
      },
    ],
  },
];
*/