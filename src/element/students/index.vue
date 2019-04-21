<template>
  <div>
    <AddStudent/>
    <UpdateStudent/>
    <SearchStudent/>
    <StudentList/>
    <Page/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("studentModule");
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import SearchStudent from "./SearchStudent";
import StudentList from "./StudentList";
import Page from "./Page";
export default {
  components: {
    AddStudent,
    UpdateStudent,
    SearchStudent,
    StudentList,
    Page
  },
  computed: {
    ...mapState(["students", "student"])
  },
  methods: {
    ...mapActions(["getStudents"])
  }
};
</script>

<style scoped>
</style>