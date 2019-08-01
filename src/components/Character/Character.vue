<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-card class="card">
            <el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true" circle></el-button>
            <h4>添加角色</h4>
          </el-card>
        </el-col>

        <el-dialog title="添加角色" :visible.sync="dialogVisible">
          <el-form :label-width="'80px'">
            <el-form-item label="角色名:">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="职责:">
              <el-cascader
                v-model="character.class_main"
                :options="class_main"
                size="mini"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="职业:">
              <el-cascader
                v-model="character.class_sub"
                :options="class_sub"
                size="mini"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <div v-if="character.class_main=='buffer'">
              <el-form-item label="常驻力智">
                <el-input size="mini" v-model="character.buff_default"></el-input>
              </el-form-item>
              <el-form-item label="常驻三攻">
                <el-input size="mini" v-model="character.buff_atk"></el-input>
              </el-form-item>
              <el-form-item label="太阳">
                <el-input size="mini" v-model="character.buff_burst"></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="15s伤害">
                <el-input size="mini" v-model="character.damage_15s">
                  <template slot="append">e</template>
                </el-input>
              </el-form-item>
              <el-form-item label="20s伤害">
                <el-input size="mini" v-model="character.damage_20s">
                  <template slot="append">e</template>
                </el-input>
              </el-form-item>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <characterItem :class_main="class_main" :class_sub="class_sub" />
      </el-row>
    </el-main>
    <el-footer>
      <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
import characterItem from "./CharacterItem.vue";
export default {
  components: { characterItem },
  methods: {
    getClassMain() {
      this.axios
        .get("static/data/class.json")
        .then(response => {
          this.class_main = response.data.options;
        })
        .catch(response => {
          console.log(response);
        });
    },
    getClassSub() {
      this.axios
        .get("static/data/class_sub.json")
        .then(response => {
          this.class_sub = response.data.options;
        })
        .catch(response => {
          console.log(response);
        });
    }
  },
  data() {
    var class_main;
    var class_sub;
    var character = {
      id: 0,
      user_id: 0,
      character_name: "",
      class_main: "",
      class_sub: "",
      damage_15s: "",
      damage_20s: "",
      buff_default: "",
      buff_atk: "",
      buff_burst: "",
      luke: 0,
      demon: 0,
      isis: 0
    };
    this.getClassMain();
    this.getClassSub();
    return {
      dialogVisible: false,
      class_main,
      class_sub,
      character
    };
  }
};
</script>
<style>
.card {
  text-align: center;
}
.character_info {
  text-align: left;
}
</style>
