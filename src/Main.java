import javax.swing.*;
import org.jgraph.*;

public class MainWindow extends JFrame
{
    JButton btnSearch;
    JTextArea txtWord;
    
       
    

public class Main {
    public static void main(String[] args) {
        
        JGraph graph = new JGraph();
        JFrame frame = new JFrame();
        frame.getContentPane().add(new JScrollPane(graph));
        frame.pack();
        frame.setVisible(true);
    }
}
