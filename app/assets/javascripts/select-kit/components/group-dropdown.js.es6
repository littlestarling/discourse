import { alias } from "@ember/object/computed";
import ComboBoxComponent from "select-kit/components/combo-box";
import DiscourseURL from "discourse/lib/url";
import { default as discourseComputed } from "discourse-common/utils/decorators";

export default ComboBoxComponent.extend({
  pluginApiIdentifiers: ["group-dropdown"],
  classNames: "group-dropdown",
  content: alias("groups"),
  tagName: "li",
  caretDownIcon: "caret-right",
  caretUpIcon: "caret-down",
  allowAutoSelectFirst: false,
  valueAttribute: "name",

  @discourseComputed("content")
  filterable(content) {
    return content && content.length >= 10;
  },

  computeHeaderContent() {
    let content = this._super(...arguments);

    if (!this.hasSelection) {
      content.label = `<span>${I18n.t("groups.index.all")}</span>`;
    }

    return content;
  },

  @discourseComputed
  collectionHeader() {
    if (
      this.siteSettings.enable_group_directory ||
      (this.currentUser && this.currentUser.get("staff"))
    ) {
      return `
        <a href="${Discourse.getURL("/g")}" class="group-dropdown-filter">
          ${I18n.t("groups.index.all").toLowerCase()}
        </a>
      `.htmlSafe();
    }
  },

  actions: {
    onSelect(groupName) {
      DiscourseURL.routeTo(Discourse.getURL(`/g/${groupName}`));
    }
  }
});
