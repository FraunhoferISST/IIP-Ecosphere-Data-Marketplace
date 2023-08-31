module.exports = {
  templates: async (node, args, context) =>
    context.collections.FieldsTemplates.find({
      id: { $in: node.templates ?? [] },
    }).toArray(),
};
