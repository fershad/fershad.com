module.exports = {
    layout: 'layouts/post.liquid',
    tags: 'note',
    permalink: function(data) {
        // slug override for localized URL slugs
        if (data.seo?.slug) {
            return `/note/${this.slugify(data.seo?.slug)}/`;
        } else if (data.slug) {
			return `/note/${this.slugify(data.slug)}/`;
		} else {
            return `/note/${this.slugify(data.page.fileSlug)}/`;
        }
    }
}
