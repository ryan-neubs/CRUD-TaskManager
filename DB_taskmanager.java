// sql import for Database management
import java.sql.*;
public class DB_taskmanager {
    static final String DB_Url = "";
    public static void main(String[] args){

        Connection conn = DriverManager.getConnection(DB_Url);
        }
    }
}
