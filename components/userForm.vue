<!-- <template>
  <template v-for="item in modalConfig.formItems" :key="item.prop">
    <v-col
      cols="12"
    >
      <template v-if="item.type === 'input'">
        <v-text-field
          v-model="userData[item.name]"
          density="compact"
          variant="outlined"
          :label="item.label"
          class="px-3"
          color="primary"
          hide-details
        />
      </template>
      <template v-if="item.type === 'select'">
        <v-select
          v-model="userData[item.name]"
          density="compact"
          variant="outlined"
          :items="item.options"
          label="Active"
          class="px-3"
          color="primary"
          hide-details
        />
      </template>
      <template v-if="item.type === 'custom'">
        <slot :name="item.slotName" />
      </template>
    </v-col>
  </template>
</template>

<script lang="ts" setup>
interface userDataProps {
  userData: any[]
}
const props = defineProps<userDataProps>()
const userData = reactive<any>(null)
</script> -->
