export default {
  nodes: [
    { id: "velx", group: 1 },
    { id: "Myriel", group: 1 },
    { id: "Napoleon", group: 1 },
    { id: "Mlle.Baptistine", group: 1 }
  ],
  links: [
    { source: "Napoleon", target: "Myriel", value: 1 },
    { source: "Mlle.Baptistine", target: "Napoleon", value: 1 },
    { source: "Mlle.Baptistine", target: "velx", value: 1 }
  ]
};
