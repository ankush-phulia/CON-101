import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

public class Grouper {

    public static void builder_excl(int k) throws FileNotFoundException {

        Hashmap voc = new Hashmap();
        String[] files = {"file_0.txt", "file_1.txt", "file_2.txt", "file_3.txt", "file_4.txt"};

        // hashmaps for each class
        Hashmap base = new Hashmap();
        Hashmap mideast = new Hashmap();
        Hashmap hock = new Hashmap();
        Hashmap autos = new Hashmap();
        Hashmap pmisc = new Hashmap();
        Hashmap rmisc = new Hashmap();
        Hashmap moto = new Hashmap();
        Hashmap guns = new Hashmap();

        HashMap<Hashmap, Integer> artcnts = new HashMap<Hashmap, Integer>();
        artcnts.put(guns, 0);
        artcnts.put(moto, 0);
        artcnts.put(autos, 0);
        artcnts.put(hock, 0);
        artcnts.put(base, 0);
        artcnts.put(pmisc, 0);
        artcnts.put(rmisc, 0);
        artcnts.put(mideast, 0);

        // read files, increment atricle-count for each article, add words to class hashmap, add
        // words to vocab
        for (int j = 0; j < files.length; j++) {
            if (j != k) {
                File f = new File(files[j]);
                Scanner s = new Scanner(f);

                while (s.hasNextLine()) {
                    String str = s.nextLine();
                    String[] stra = str.split("\\s+");
                    switch (stra[0]) {
                        case "rec.sport.baseball":
                            artcnts.put(base, artcnts.get(base) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                base.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                        case "talk.politics.mideast":
                            artcnts.put(mideast, artcnts.get(mideast) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                mideast.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                        case "talk.religion.misc":
                            artcnts.put(rmisc, artcnts.get(rmisc) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                rmisc.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                        case "rec.motorcycles":
                            artcnts.put(moto, artcnts.get(moto) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                moto.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                        case "rec.sport.hockey":
                            artcnts.put(hock, artcnts.get(hock) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                hock.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                        case "talk.politics.misc":
                            artcnts.put(pmisc, artcnts.get(pmisc) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                pmisc.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                        case "rec.autos":
                            artcnts.put(autos, artcnts.get(autos) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                autos.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                        case "talk.politics.guns":
                            artcnts.put(guns, artcnts.get(guns) + 1);
                            for (int i = 1; i < stra.length; i++) {
                                guns.insert(stra[i]);
                                voc.insert(stra[i]);
                            }
                            break;
                    }
                }
            }
        }

        // open test file
        File f = new File(files[k]);
        Scanner s = new Scanner(f);
        int words = voc.numKeys;
        int articles = 0;
        int matches = 0;
        Iterator<Hashmap> it = artcnts.keySet().iterator();
        while (it.hasNext()) {
            articles = articles + artcnts.get(it.next());
        }
        while (s.hasNextLine()) {

            String str = s.nextLine();
            String[] stra = str.split("\\s+");

            Hashmap tmp = new Hashmap();
            for (int i = 1; i < stra.length; i++) {
                tmp.insert(stra[i]);
            }

            // calc prob of article belonging to a class
            double d1 =
                    base.prob(words, tmp, voc) + Math.log(artcnts.get(base)) - Math.log(articles);
            double d2 =
                    guns.prob(words, tmp, voc) + Math.log(artcnts.get(guns)) - Math.log(articles);
            double d3 =
                    rmisc.prob(words, tmp, voc) + Math.log(artcnts.get(rmisc)) - Math.log(articles);
            double d4 =
                    pmisc.prob(words, tmp, voc) + Math.log(artcnts.get(pmisc)) - Math.log(articles);
            double d5 =
                    hock.prob(words, tmp, voc) + Math.log(artcnts.get(hock)) - Math.log(articles);
            double d6 =
                    mideast.prob(words, tmp, voc)
                            + Math.log(artcnts.get(mideast))
                            - Math.log(articles);
            double d7 =
                    autos.prob(words, tmp, voc) + Math.log(artcnts.get(autos)) - Math.log(articles);
            double d8 =
                    moto.prob(words, tmp, voc) + Math.log(artcnts.get(moto)) - Math.log(articles);
            // get the maximum prob
            double[] drr = {d1, d2, d3, d4, d5, d6, d7, d8};
            double d0 = drr[0];
            int ind = 0;
            for (int q = 1; q < 8; q++) {
                if (drr[q] > d0) {
                    ind = q;
                    d0 = drr[q];
                }
            }

            // check if prediction is correct
            String[] categ = {
                "rec.sport.baseball",
                "talk.politics.guns",
                "talk.religion.misc",
                "talk.politics.misc",
                "rec.sport.hockey",
                "talk.politics.mideast",
                "rec.autos",
                "rec.motorcycles"
            };
            if (categ[ind].equals(stra[0])) {
                matches++;
            }
        }
        System.out.println(matches);
    }

    public static void main(String[] args) throws FileNotFoundException {
        builder_excl(0);
        builder_excl(1);
        builder_excl(2);
        builder_excl(3);
        builder_excl(4);
    }
}
