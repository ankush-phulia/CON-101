public class Event implements Comparable<Event> {
    // line number of first occurence, last ocurrence, varaible name
    int f;
    int l;
    String var;

    public Event(int i, int j, String s) {
        f = i;
        l = j;
        var = s;
    }

    public int compareTo(Event e) {
        // order by finishing time - earliest finishing first
        if (l > e.l) {
            return 1;
        } 
        else if (l < e.l) {
            return -1;
        } 
        else {
            if (f > e.f) {
                return 1;
            } 
            else if (f < e.f) {
                return -1;
            } 
            else {
                return 0;
            }
        }
    }
}
