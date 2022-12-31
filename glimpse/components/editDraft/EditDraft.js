import { View, StyleSheet, Text } from 'react-native'
import React, {useState} from 'react'
import { DraggableGrid } from 'react-native-draggable-grid';




  function render_item(item) {
    return (
      <View
        style={styles.item}
        key={item.key}
      >
        <Text style={styles.item_text}>{item.name}</Text>
      </View>
    );
  }
const styles = StyleSheet.create({
  button:{
    width:150,
    height:100,
    backgroundColor:'blue',
  },
  wrapper:{
    paddingTop:100,
    width:'100%',
    height:'100%',
    justifyContent:'center',
  },
  item:{
    width:100,
    height:100,
    borderRadius:8,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
  },
  item_text:{
    fontSize:40,
    color:'#FFFFFF',
  },
});

const EditDraft = () => {
    initialData = [
        {name:'1',key:'one'},
        {name:'2',key:'two'},
        {name:'3',key:'three'},
        {name:'4',key:'four'},
        {name:'5',key:'five'},
        {name:'6',key:'six'},
        {name:'7',key:'seven'},
        {name:'8',key:'eight'},
        {name:'9',key:'night'},
        {name:'0',key:'zero'},
      ];
    const [data, setData] = useState(initialData)

  return (
    <View>
      <Text>EditDraft</Text>
      <View style={styles.wrapper}>
        <DraggableGrid
          numColumns={4}
          renderItem={render_item}
          data={data}
          onDragRelease={(data) => {
            setData(data);
          }}
        />
      </View>
    </View>
  )
}

export default EditDraft