import java.util.HashMap;
import java.util.Iterator;

public class Hashmap {

	HashMap<String,Integer> map=new HashMap<String,Integer>();
	int numKeys=0;
	int val=0;
	
	public int getNum(String s){
		return map.get(s);
	}
	
	public void insert(String s){
		if (map.containsKey(s)){
			map.put(s, map.get(s)+1);
		}
		else{
			map.put(s,1);
			numKeys++;
		}
		val++;
	}
		
	public double prob(int n,Hashmap a, Hashmap vocab){
		Iterator<String> it=a.map.keySet().iterator();
		double ans=1.0;
		while (it.hasNext()){
			String str=it.next();
			if (vocab.map.containsKey(str) && this.map.get(str)!=null){
				double x=this.map.get(str)+1.0;
				double y=val+n;
				ans=ans+(Math.log(x)-Math.log(y))*a.getNum(str);
			}
			else if (vocab.map.containsKey(str)&& this.map.get(str)==null){
				double x=1.0;
				double y=val+n;
				ans=ans+(Math.log(x)-Math.log(y))*a.getNum(str);
			}
		}
		return ans;
	}
	
}
