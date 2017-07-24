package com.repo.archiver.processes;

import com.repo.archiver.pojo.AcceptableProcesses;

/**
 * Created by ali_jalbani on 2/16/17.
 */
public class ProcessFactory {

    private static AcceptableProcesses processType = null;

    public static AbstractProcess getProcess(AcceptableProcesses process){
        processType = process;
        switch (processType){
            case EFFICACYMETRICS:
                return new EfficacyMetrics();
            case FALSENEGATIVES:
                return new FalseNegatives();
            case FALSEPOSITIVES:
                return new FalsePositives();
            default:
                return null;
        }
    }
}
