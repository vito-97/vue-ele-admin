<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import checkPermission from '@/utils/permission'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  created() {
    if (!checkPermission('dashboard/index')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
