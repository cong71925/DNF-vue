<template>
  <el-container>
    <el-main id="index">
      <h1>DNF-VUE.js</h1>
      <el-divider content-position="left">项目说明</el-divider>
      <div>
        <p>
          本项目主要面向于小团体，可以更方便地查看和管理每个群员的打团角色信息（方便群内打碟）。
          对于常年打野玩家而言，本项目也可以帮你管理角色的各种数据，例如C的打桩伤害，奶的buff数据，提升率等。
          但是应该是对进团没有任何帮助的（毕竟你不可能背着绿纱袋打团）。
        </p>
        <p>以后可能大概或许会加新功能（咕咕咕）。</p>
      </div>
      <el-divider content-position="left">安全声明</el-divider>
      <div>
        <p>
          前段时间的大面积盗号，搞得大家都人心惶惶的。如果你担心密码泄露的问题，那么仅当本网站，我建议大家使用123456作为登录密码。
          （反正这破站的账号被盗了也没什么问题的）
        </p>
        <p>如果你不想用123456做密码，也没有问题。本站已强制开启了https，且密码在前端和后端都会经过哈希函数加密:</p>
        <p>
          <el-image :src="imgSrc[0]" :fit="'fit'" :preview-src-list="imgSrc"></el-image>
        </p>
        <p>上图是存放在数据库中的密码示例，这种加密是单向的，难以反向推出加密前的明文。</p>
        <p>
          本项目的前端部分已在
          <el-link
            href="https://github.com/cong71925/DNF-vue"
            :underline="false"
            target="_blank"
          >Github</el-link>上开源。
          后端用PHP写的，暂时没有开源的打算。
        </p>
      </div>
      <el-divider content-position="left">创建团队说明</el-divider>
      <div>
        <p>
          <el-image :src="imgSrc[3]" :fit="'fit'" :preview-src-list="imgSrc"></el-image>
        </p>
        <p>点击上方导航栏的我的小团体按钮，再点击搜索栏左侧的创建团队，输入相关信息即可创建团队。</p>
        <p>
          <el-image
            :src="imgSrc[4]"
            :fit="'contain'"
            :preview-src-list="imgSrc"
            style="height: 300px;width: 500px"
          ></el-image>
        </p>
        <p>把新创建团队ID和加入密码分享给群友，他们就可以加入你的团队了。</p>
      </div>
      <el-divider content-position="left">加入团队说明</el-divider>
      <div>
        <p>
          <el-image :src="imgSrc[5]" :fit="'fit'" :preview-src-list="imgSrc"></el-image>
        </p>
        <p>点击上方导航栏的我的小团体按钮，在搜索栏输入你要加入的团队ID，在弹出框输入团队加入密码后，点击右方的按钮，即可加入团队。</p>
        <p>
          <el-image :src="imgSrc[6]" :fit="'fit'" :preview-src-list="imgSrc"></el-image>
        </p>
      </div>
      <el-divider content-position="left">角色登记说明</el-divider>
      <div>
        <p>C的登记没什么好说的，把绿纱袋15s20s的伤害登记进去就行了，吃多少药看自己。</p>
        <p>奶登记是buff的数值：</p>
        <p>
          <el-image
            :src="imgSrc[1]"
            :preview-src-list="imgSrc"
            :fit="'scale-down'"
            style="height: 160px;width: 300px"
          ></el-image>
          <el-image
            :src="imgSrc[2]"
            :preview-src-list="imgSrc"
            :fit="'scale-down'"
            style="height: 160px;width: 300px"
          ></el-image>
        </p>
        <p>奶妈和奶萝都是登记buff的数值就行了，不需要算上唱歌和偏爱，本项目在计算提升率时会自动计算。</p>
        <p>奶爸请登记叠满二觉后的buff和太阳，有条件的可以测有魔王契约假紫光环之类的buff。</p>
        <p>奶测buff可以找朋友进修炼场或者帝国竞技场，这里不再赘述。</p>
      </div>
      <el-divider content-position="left">提升率计算说明</el-divider>
      <div>
        <p>
          为便于计算，计算提升率的模板C为3000力智，2400三攻，系统奶为8000力智，该模板C偏弱的原因是为了方便奶之间的横向比较。
          因此计算出来的提升率仅有参考意义。
        </p>
        <p>奶妈在提升率会计算常驻buff的圣歌30%加成。</p>
        <p>
          奶萝的提升率会计算常驻buff的死命召唤25%和偏爱的一半加成（即7.5%加成），由于奶萝的偏爱问题，
          倘若计算提升率时仅计算单C的偏爱的话会偏高，不利于奶之间的横向比较，因此仅计算7.5%的偏爱加成。
        </p>
        <p>奶爸无唱歌，因而无加成。</p>
      </div>
      <el-divider content-position="left">补充</el-divider>
      <div>
        <p>
          本项目的职业头像来源于colg的
          <el-link
            href="https://bbs.colg.cn/thread-7501852-1-1.html"
            :underline="false"
            target="_blank"
            icon="el-icon-link"
          >肥猫池塘</el-link>大佬，感谢大佬的制作与分享！
        </p>
        <p>
          本站仅为个人学习研究性质，如果你发现网站打不开，那多半是忘了交钱导致vps停机，或者是ip被ban，届时请通过
          <el-link
            href="mailto:cong71925@gmail.com"
            icon="el-icon-message"
            :underline="false"
            target="_blank"
          >cong71925@gmail.com</el-link>联系我，
          如果你发现了什么bug或者有什么建议，也可以发邮件至我的邮箱。
        </p>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    const imgSrc = [
        '/static/image/index/01.png',
        '/static/image/index/buffDefault.jpg',
        '/static/image/index/buffBurst.jpg',
        '/static/image/index/02.png',
        '/static/image/index/03.png',
        '/static/image/index/04.png',
        '/static/image/index/05.png'
      ]
    return {
      imgSrc
    }
  }
}
</script>
<style>
#index p {
  text-indent: 2em;
}
.el-link {
  text-indent: 0;
}
.el-image {
  text-indent: 0;
  max-width: 90%;
}
</style>
