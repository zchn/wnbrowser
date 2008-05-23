import edu.smu.tspell.wordnet.*;
import java.io.File;
//import edu.smu.tspell.wordnet.Synset;
//import edu.smu.tspell.wordnet.WordNetDatabase;
//import edu.smu.tspell.wordnet.SynsetType;
    
public class jawsTest{
    private static final String WORDNET_DATABASE_DIR_TAG = "wordnet.database.dir";
    public static void main(String[] args) 
    {
        System.setProperty(WORDNET_DATABASE_DIR_TAG,
                            "."
                            + File.separator + "dict");
        WordNetDatabase database = WordNetDatabase.getFileInstance();
        
        Synset[] nounFlies = database.getSynsets("fly", SynsetType.NOUN);

        System.out.println(nounFlies[1].getDefinition());
    }
		
}
