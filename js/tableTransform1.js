function addTableSpans(columns) {
  // Deep copy to avoid modifying the original object
  const newColumns = JSON.parse(JSON.stringify(columns));

  /**
   * Recursively processes a node to calculate colSpan and rowSpan.
   * @param {object} node - The node to process.
   * @returns {{colSpan: number, height: number}} - The calculated colSpan and height of the node.
   */
  function processNode(node) {
    if (!node.children || node.children.length === 0) {
      // Leaf node
      return { colSpan: 1, height: 1 };
    }

    // Recursively process children
    const childrenInfo = node.children.map(child => processNode(child));

    let totalColSpan = 0;
    let maxHeight = 0;
    childrenInfo.forEach(info => {
      totalColSpan += info.colSpan;
      if (info.height > maxHeight) {
        maxHeight = info.height;
      }
    });

    if (totalColSpan > 1) {
        node.colSpan = totalColSpan;
    }

    // Assign rowSpan to children that are not as deep as their tallest sibling
    node.children.forEach((child, index) => {
      const childInfo = childrenInfo[index];
      if (childInfo.height < maxHeight) {
        child.rowSpan = maxHeight - childInfo.height + 1;
      }
    });

    return { colSpan: totalColSpan, height: maxHeight + 1 };
  }

  processNode(newColumns);
  return newColumns;
}

// --- Test Cases ---

// Example 1
const testData1 = {
  title: "Company",
  children: [
    {
      title: "Company Address",
    },
    {
      title: "Company Name",
    },
  ],
};

const result1 = addTableSpans(testData1);
console.log("--- Example 1 ---");
console.log(JSON.stringify(result1, null, 2));

// Example 2
const testData2 = {
  title: 'Company',
  children: [
    {
      title: "Company Address",
    },
    {
      title: "Company Name",
      children: [
        {
            title: 'name1',
        },
        {
            title: 'name2',
        },
        {
            title: 'name3',
        },
      ]
    },
 ]
};

const result2 = addTableSpans(testData2);
console.log("--- Example 2 ---");
console.log(JSON.stringify(result2, null, 2));

