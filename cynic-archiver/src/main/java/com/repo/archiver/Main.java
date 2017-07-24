package com.repo.archiver;

/**
 * Created by ali_jalbani on 1/31/17.
 */


import java.util.EnumMap;
import com.repo.archiver.pojo.AcceptableProcesses;
import com.repo.archiver.processes.ProcessFactory;
import com.repo.archiver.properties.Properties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {

    private static Properties properties;
    private AcceptableProcesses processType = null;
    private EnumMap<AcceptableProcesses, String> map;

    public static Properties getProperties() {
        return properties;
    }
    private void setProperties(Properties properties) {
        this.properties = properties;
    }

    public Main(String p){
        setProperties((Properties)getContext().getBean("properties"));
        map = new EnumMap<>(AcceptableProcesses.class);
        map.put(AcceptableProcesses.EFFICACYMETRICS, "em");
        map.put(AcceptableProcesses.FALSENEGATIVES, "fn");
        map.put(AcceptableProcesses.FALSEPOSITIVES, "fp");

        switch (p){
            case "em":
                processType = AcceptableProcesses.EFFICACYMETRICS;
                break;
            case "fn":
                processType = AcceptableProcesses.FALSENEGATIVES;
                break;
            case "fp":
                processType = AcceptableProcesses.FALSEPOSITIVES;
                break;
            default:
                processType = null;
        }
    }

    public static void main(String[] args) throws Throwable {
        try {
            if(args.length==1){
                Main main = new Main(args[0]);
                main.run();
                System.out.println("Process exited gracefully.");
            }else{
                System.out.println("Invalid arguments");
            }
        }catch (Exception e){
            System.out.println(e.getStackTrace());
        }
    }

    public static ApplicationContext getContext(){
        ApplicationContext context =
                new ClassPathXmlApplicationContext("spring/applicationContext.xml");
        return context;
    }

    public void run(){
        ProcessFactory.getProcess(this.processType).run();
    }
}

