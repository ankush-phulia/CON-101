import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

public class Assignment {	
	
	public static void rem(ArrayList<Event>a){
		if (!a.isEmpty()){
			int x=a.get(a.size()-1).f;
			int y=a.get(a.size()-1).l;
			Event tmp=a.remove(0);
			//System.out.println(tmp.var);
			while (tmp.l<x){
				for (int i=0;i<a.size();i++){
					if (a.get(i).f>tmp.l){
						tmp=a.remove(i);
						//System.out.println(tmp.var);
						break;
					}
				}
			}
		}
	}
	
	public static void main(String[] args) throws FileNotFoundException {
		
		File f=new File("input.txt");
		Scanner s=new Scanner(f);
		
		HashMap<String, ArrayList<Integer>> h=new HashMap<String, ArrayList<Integer>>();
		int cnt=0;
		
		while (s.hasNext()){
			String stri=s.nextLine();
			stri=stri.replaceAll("[^a-zA-Z0-9\\s]"," ");
			String[] str=stri.split("\\s+");
			for (int i=0;i<str.length;i++){
				String a=str[i];
				if (h.containsKey(a)){
					h.get(a).add(cnt);
				}
				else{
					h.put(a, new ArrayList<Integer>());
					h.get(a).add(cnt);
				}
			}
			cnt++;
		}
		
		HashMap<String, Event> hh=new HashMap<String, Event>();
		Iterator<String> it=h.keySet().iterator();
		while (it.hasNext()){
			String ss=it.next();
			ArrayList<Integer>a=h.get(ss);
			Event e=new Event(a.get(0),a.get(a.size()-1),ss);
			hh.put(ss,e);
		}
		
		ArrayList<Event> arr=new ArrayList<Event>();
		Iterator<String> itt=hh.keySet().iterator();
		while (itt.hasNext()){
			arr.add(hh.get(itt.next()));
		}
		Collections.sort(arr);
				
		/*for (int j=0;j<arr.size();j++){
			System.out.print(arr.get(j).var + " ");
		}*/
		//System.out.println();
		
		int min=0;
		while (!arr.isEmpty()){
			rem(arr);
			min++;
		}
		System.out.println(min);
	}

}
