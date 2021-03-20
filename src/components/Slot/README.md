
   使用
   
```vue
  <Slot>
      <template>
        我想替换第一个匿名插槽
      </template>
      <!--   v-slot:footer="scoped" 简写 #footer="scoped"  -->
      <!--   如果想获取插槽里的内容可以这样写 同时写多个会覆盖       -->
      <template v-slot:footer>默认插槽内容</template>
      <template v-slot:footer="scoped">
        {{ scoped.content }}
        <slot>qqqqqq</slot>
        <slot>{{ user.name }}</slot>
        <slot slot="footer">父组件内容1--footer</slot>
        <slot slot="footer">父组件内容2--footer</slot>
        <slot>父组件内容2</slot>
        <slot>父组件内容3</slot>
      </template>
    </Slot>
```

```vue
<Slot>
   <template>zcy</template>
</Slot>
```
