<script lang="ts">
import { defineComponent } from "vue";
import otherProjectsData from "@/data/OtherProjectsData";

export default defineComponent({
  name: "OtherProjects",
  data: function () {
    return {
      projects: otherProjectsData,
    };
  },
});
</script>