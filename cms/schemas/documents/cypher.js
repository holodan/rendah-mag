export default {
  name: "cypher",
  title: "Cypher",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "For example: Cypher 009 (Curated By Renraku)",
      validation: Rule => Rule.required().max(60)
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },

    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      type: "object",
      name: "announcementFields",
      title: "Announcement Fields",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "announcedAt",
          title: "Announcement Date",
          type: "datetime",
        },
        {
          name: "isAnnounced",
          title: "Announced",
          type: "boolean"
        },
        {
          name: "announcementDescription",
          title: "Announcement Description",
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    },
    {
      type: "object",
      name: "publishedFields",
      title: "Published Fields",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "publishedAt",
          title: "Published Date",
          type: "datetime",
        },
        {
          name: "isPublished",
          title: "Published",
          type: "boolean"
        },
        {
          name: "publishedDescription",
          title: "Published Description",
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: "shortUrl",
          title: "Short URL",
          type: "string",
          description: "Shortened gate link to the track.",
        },
      ]
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "image"
    }
  }
};
